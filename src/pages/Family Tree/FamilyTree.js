import React, { useEffect, useState } from 'react';
import Tree from 'react-d3-tree';
import Modal from 'react-modal';
import FamilyTreeData from './FamilyTreeData';
import './FamilyTree.css';

// Utility function to convert flat data to nested format
const convertToNestedFormat = (flatData) => {
  const idMap = {};

  // Create a map of IDs to nodes
  flatData.forEach(node => {
    idMap[node.id] = { ...node, children: [] };
  });

  // Assign children to their respective parents
  flatData.forEach(node => {
    if (node.parents.length > 0) {
      node.parents.forEach(parentId => {
        if (idMap[parentId]) {
          idMap[parentId].children.push(idMap[node.id]);
        }
      });
    }
  });

  // Find the root nodes (those without parents)
  const rootNodes = flatData.filter(node => node.parents.length === 0).map(node => idMap[node.id]);

  return rootNodes.length === 1 ? rootNodes[0] : { name: 'UoP Dodgeball', children: rootNodes };
};

// Color palette for different generations
const generationColors = ['#FFDDC1', '#FFABAB', '#FFC3A0', '#FF677D', '#D4A5A5', '#392F5A', '#31A2AC', '#61C0BF'];

// Custom node element rendering function
const renderCustomNodeElement = ({ nodeDatum, hierarchyPointNode, handleClick }) => {
  const depth = hierarchyPointNode.depth;
  const color = generationColors[depth % generationColors.length];

  return (
    <g className="custom-node" onClick={() => handleClick(nodeDatum)}>
      <foreignObject width="200" height="100" x="-100" y="-50">
        <div className="custom-node-card" style={{ background: `linear-gradient(135deg, ${color} 0%, #FFFFFF 100%)` }}>
          <div className="custom-node-name">{nodeDatum.name}</div>
        </div>
      </foreignObject>
    </g>
  );
};

// Function to detect overlap
const detectOverlap = (source, target, nodes) => {
  const padding = 10; // Adjust as needed
  const pathBounds = {
    left: Math.min(source.x, target.x) - padding,
    right: Math.max(source.x, target.x) + padding,
    top: Math.min(source.y, target.y) - padding,
    bottom: Math.max(source.y, target.y) + padding,
  };

  return nodes.some(node => {
    const nodeBounds = {
      left: node.x - 100, // Adjust width/2
      right: node.x + 100, // Adjust width/2
      top: node.y - 50, // Adjust height/2
      bottom: node.y + 50, // Adjust height/2
    };

    return !(nodeBounds.left > pathBounds.right ||
             nodeBounds.right < pathBounds.left ||
             nodeBounds.top > pathBounds.bottom ||
             nodeBounds.bottom < pathBounds.top);
  });
};

// Custom path function for vertical orientation
const customPathFunc = (linkDatum, nodes) => {
  const { source, target } = linkDatum;
  const deltaX = target.x - source.x;
  const deltaY = target.y - source.y;
  const midX = source.x + deltaX / 2;
  const midY = source.y + deltaY / 2;

  if (detectOverlap(source, { x: source.x, y: midY }, nodes)) {
    return `M${source.x},${source.y} V${midY} H${source.x + deltaX / 4} V${target.y} H${target.x}`;
  }

  return `M${source.x},${source.y} V${midY} H${target.x} V${target.y}`;
};

const FamilyTreeComponent = () => {
  const [treeData, setTreeData] = useState(convertToNestedFormat(FamilyTreeData));
  const [selectedNode, setSelectedNode] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = (nodeDatum) => {
    setSelectedNode(nodeDatum);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedNode(null);
  };

  const addChild = () => {
    const childName = prompt("Enter the name of the new child:");
    if (childName && selectedNode) {
      const newNode = { id: `${Date.now()}`, name: childName, parents: [selectedNode.id], children: [] };

      const addNodeRecursively = (nodes) => {
        return nodes.map(node => {
          if (node.id === selectedNode.id) {
            return { ...node, children: [...node.children, newNode] };
          } else if (node.children) {
            return { ...node, children: addNodeRecursively(node.children) };
          }
          return node;
        });
      };

      setTreeData(prevTreeData => {
        const newTreeData = { ...prevTreeData };
        newTreeData.children = addNodeRecursively(newTreeData.children);
        return newTreeData;
      });
    }
    closeModal();
  };

  return (
    <div className="family-tree-container">
      <h1 className="header">Dodgeball Family Tree</h1>
      <div id="treeWrapper" style={{ width: '100%', height: '100vh' }}>
        <Tree
          data={treeData}
          orientation="vertical"
          translate={{ x: 600, y: 50 }}
          nodeSize={{ x: 300, y: 200 }}
          separation={{ siblings: 2, nonSiblings: 1 }}
          pathFunc={(linkDatum) => customPathFunc(linkDatum, treeData.children)}
          renderCustomNodeElement={(rd3tProps) => renderCustomNodeElement({ ...rd3tProps, handleClick: openModal })}
        />
      </div>
      {selectedNode && (
        <Modal isOpen={modalIsOpen} onRequestClose={closeModal} className="modal" overlayClassName="modal-overlay">
          <div className="modal-content">
            <div className="custom-node-card modal-card" style={{ background: `linear-gradient(135deg, ${generationColors[selectedNode.depth % generationColors.length]} 0%, #FFFFFF 100%)` }}>
              <div className="custom-node-name">{selectedNode.name}</div>
              <div className="custom-node-info">Child of {selectedNode.parents.join(', ')}</div>
              <div className="custom-node-info">Parent of {selectedNode.children.map(child => child.name).join(', ')}</div>
            </div>
            <div className="modal-buttons">
              <button onClick={addChild}>Add Child</button>
              <button onClick={closeModal}>Close</button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default FamilyTreeComponent;
