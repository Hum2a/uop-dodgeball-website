import React from 'react';
import './FamilyTree.css';
import familyTreeData from './FamilyTreeData';

const FamilyTreeNode = ({ node }) => {
  return (
    <div className="node-container">
      <div className="node">
        <div className="name">{node.name}</div>
      </div>
      {node.children && (
        <div className="children">
          {node.children.map((child, index) => (
            <FamilyTreeNode key={index} node={child} />
          ))}
        </div>
      )}
    </div>
  );
};

const FamilyTree = () => {
  return (
    <div className="family-tree">
      {familyTreeData.map((rootNode, index) => (
        <FamilyTreeNode key={index} node={rootNode} />
      ))}
    </div>
  );
};

export default FamilyTree;
