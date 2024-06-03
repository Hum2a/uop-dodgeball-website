import React, { useEffect, useState } from 'react';
import Tree from 'react-d3-tree';
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
const renderCustomNodeElement = ({ nodeDatum, hierarchyPointNode }) => {
  const depth = hierarchyPointNode.depth;
  const color = generationColors[depth % generationColors.length];

  return (
    <g className="custom-node">
      <foreignObject width="200" height="100" x="-100" y="-50">
        <div className="custom-node-card" style={{ backgroundColor: color }}>
          <div className="custom-node-name">{nodeDatum.name}</div>
        </div>
      </foreignObject>
    </g>
  );
};

const FamilyTreeComponent = () => {
  const [treeData, setTreeData] = useState(convertToNestedFormat(FamilyTreeData));

  return (
    <div className="family-tree-container">
      <h1 className="header">Dodgeball Family Tree</h1>
      <div id="treeWrapper" style={{ width: '100%', height: '100vh' }}>
        <Tree
          data={treeData}
          translate={{ x: 400, y: 100 }}
          nodeSize={{ x: 300, y: 200 }}
          separation={{ siblings: 1.5, nonSiblings: 2 }}
          pathFunc="elbow"
          renderCustomNodeElement={renderCustomNodeElement}
        />
      </div>
    </div>
  );
};

export default FamilyTreeComponent;
