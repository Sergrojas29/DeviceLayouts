import React, { useState } from 'react';
import { Table, Group, Text, Box } from '@mantine/core';
import { IconGripVertical } from '@tabler/icons-react';
import {
  DndContext,
  closestCenter,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
  arrayMove,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

// --- Data Structure ---
const initialData = [
  { id: '1', name: 'Alpha', rank: 1 },
  { id: '2', name: 'Beta', rank: 2 },
  { id: '3', name: 'Gamma', rank: 3 },
  { id: '4', name: 'Delta', rank: 4 },
  { id: '5', name: 'Epsilon', rank: 5 },
  { id: '6', name: 'Zeta', rank: 6 },
  { id: '7', name: 'Eta', rank: 7 },
];

// --- SortableRow Component ---
// This component encapsulates the dnd-kit logic for a single row.
function SortableRow({ item }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    // Add a slight elevation and opacity change when dragging for better UX
    zIndex: isDragging ? 10 : 0,
    backgroundColor: isDragging ? 'var(--mantine-color-blue-light)' : 'white',
    opacity: isDragging ? 0.9 : 1,
  };

  return (
    <Table.Tr ref={setNodeRef} style={style}>
      {/* Draggable Handle Cell */}
      <Table.Td>
        <Group gap="xs">
          {/* Apply listeners and attributes to the drag handle, not the whole row */}
          <IconGripVertical
            size={18}
            style={{ cursor: 'grab' }}
            {...attributes}
            {...listeners}
          />
          <Text size="sm" fw={500}>{item.rank}</Text>
        </Group>
      </Table.Td>
      {/* Data Cells */}
      <Table.Td>{item.name}</Table.Td>
      <Table.Td>{item.id}</Table.Td>
    </Table.Tr>
  );
}


// --- DraggableTable Component ---
export function DraggableTable() {
  const [data, setData] = useState(initialData);

  // Set up sensors for mouse and touch interactions
  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {})
  );

  // Function called when a drag operation ends
  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setData((currentData) => {
        // Find the index of the active (dragged) item
        const oldIndex = currentData.findIndex((item) => item.id === active.id);
        // Find the index of the item it was dropped over
        const newIndex = currentData.findIndex((item) => item.id === over.id);

        // Calculate the new array order using dnd-kit's utility
        let newOrder = arrayMove(currentData, oldIndex, newIndex);

        // --- Crucial Step: Update the rank property based on the new index ---
        newOrder = newOrder.map((item, index) => ({
          ...item,
          // Rank is simply the new position (index + 1)
          rank: index + 1, 
        }));
        
        return newOrder;
      });
    }
  };

  // Generate the rows using the current data state
  const rows = data.map((item) => (
    <SortableRow key={item.id} item={item} />
  ));

  return (
    <Box maw={600} mx="auto" p="md">
        <Text size="lg" fw={700} mb="md">Draggable Rank Table</Text>
      <DndContext 
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext 
          items={data.map((item) => item.id)} // Pass the IDs of the sortable items
          strategy={verticalListSortingStrategy}
        >
          <Table striped highlightOnHover withTableBorder withColumnBorders>
            <Table.Thead>
              <Table.Tr>
                <Table.Th style={{ width: 100 }}>Rank</Table.Th>
                <Table.Th>Name</Table.Th>
                <Table.Th>ID</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {rows}
            </Table.Tbody>
          </Table>
        </SortableContext>
      </DndContext>
    </Box>
  );
}

// Example usage in your App.jsx or similar file
// import { DraggableTable } from './DraggableTable';
// function App() { return <DraggableTable />; }