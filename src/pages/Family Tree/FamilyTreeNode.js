import React from 'react';

const colors = ['#FFD700', '#ADFF2F', '#7FFFD4', '#6495ED', '#DDA0DD', '#FFB6C1']; // Example colors for each generation

const FamilyTreeNode = ({ node, addChild, generation }) => {
  const handleClick = () => {
    const childName = prompt("Enter the name of the new child:");
    if (childName) {
      addChild(node, childName);
    }
  };

  const nodeStyle = {
    backgroundColor: colors[generation % colors.length]  // Cycle through colors array
  };

  return (
    <div className="node-container" style={{ position: 'relative' }}>
      {/* Horizontal line connecting the node to the vertical line */}
      <div style={{
          position: 'absolute',
          left: '-40px', // Adjust this value based on your layout
          top: '50%',
          width: '50px', // Length of the horizontal connector
          height: '2px',
          backgroundColor: 'grey',
          transform: 'translateY(-50%)'
        }}
      />
      <div className="node" onClick={handleClick} style={nodeStyle}>
        <div className="name">{node.name}</div>
      </div>
      {node.children && (
        <div className="children">
          {node.children.map((child, index) => (
            <FamilyTreeNode key={index} node={child} addChild={addChild} generation={generation + 1}/>
          ))}
        </div>
      )}
    </div>
  );
};

export default FamilyTreeNode;
