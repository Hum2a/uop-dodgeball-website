import React, { useState } from 'react';
import FamilyTreeNode from './FamilyTreeNode';
import './FamilyTree.css';
import initialFamilyTreeData from './FamilyTreeData';

const FamilyTree = () => {
  const [familyTreeData, setFamilyTreeData] = useState(initialFamilyTreeData);

  
  const addChild = (parentNode, childName) => {
    const newNode = { name: childName, children: [] };

    // Function to recursively add a new child to the matching parent node
    const addNode = node => {
      if (node.name === parentNode.name) {
        node.children = [...(node.children || []), newNode];
        return;
      }
      node.children && node.children.forEach(addNode);
    };

    // Create a deep copy of the family tree data
    const updatedFamilyTreeData = JSON.parse(JSON.stringify(familyTreeData));
    updatedFamilyTreeData.forEach(addNode);
    console.log(updatedFamilyTreeData); // Debug: Log the updated tree
    setFamilyTreeData(updatedFamilyTreeData);
  };

  return (
    <div>
      <div className="family-tree">
        <div className="header">
          Dodgeball Family Tree
        </div>
        {familyTreeData.map((rootNode, index) => (
          <FamilyTreeNode key={index} node={rootNode} addChild={addChild} s generation={0}/>
        ))}
      </div>
    </div>
  );
};

export default FamilyTree;
