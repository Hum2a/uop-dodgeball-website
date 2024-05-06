import './FamilyTree.css'

const FamilyTreeNode = ({ node, addChild }) => {
  const handleClick = () => {
    const childName = prompt("Enter the name of the new child:");
    if (childName) {
      addChild(node, childName);
    }
  };

  return (
    <div className="node-container">
      <div className="node" onClick={handleClick}>
        <div className="name">{node.name}</div>
      </div>
      {node.children && (
        <div className="children">
          {node.children.map((child, index) => (
            <FamilyTreeNode key={index} node={child} addChild={addChild} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FamilyTreeNode;
