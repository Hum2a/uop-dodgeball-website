import React, { useState } from 'react';
import FamilyTreeNode from './FamilyTreeNode';
import './FamilyTree.css';

const initialFamilyTreeData = [
  {
    name: "Lydia Davies",
    children: [
        {
            name: "Iona Pidgen"
        },
        {
            name: "Riley Hagen",
            children: [
            { name: "Ethan Humphries" },
            { 
                name: "Mikel Walsh",
                children: [
                    { name: "Ryan Constable" },
                    { name: "Jae Taylor" },
                    { name: "Alex Muffet" }
                ]
            },
            { 
                name: "Adam Case-Legge",
                children: [
                    { 
                        name: "Chris Baynes",
                        children: [
                            { name: "Ella Silvester" },
                            { name: "Tom Lacey" }
                        ]
                    },
                    {
                        name: "Sam Richardon",
                        children: [ 
                            { name: "Maeve Cotter" },
                        ]
                    },
                    {
                        name: "Ben Barthomolew",
                        children: [
                            { name: "Gracie Pratchett" },
                            { name: "Havish Patel" }
                        ]
                    }
                ]
            }
            ]
        },
        {
            name: "Erin Good",
            children: [
            { 
                name: "Alex Stratton",
                children: [
                    { name: "Shalika De Freitas" }
                ],
            }
            ]
        }
    ]
  },
  {
    name: "Nat Wannapon",
    children: [
      {
        name: "Ollie Bennet"
      },
      {
        name: "Ellie Handball"
      },
      {
        name: "Humza Butt",
        children: [
          { name: "Ali Hamm" },
          { name: "James W" },
          { name: "Caitlin Lubbe" }
        ]
      }
    ]
  }
];

const FamilyTree = () => {
  const [familyTreeData, setFamilyTreeData] = useState(initialFamilyTreeData);

  
  const addChild = (parentNode, childName) => {
    const newNode = { name: childName, children: [] };

    // Function to recursively add a new child to the matching parent node
    const addNode = (node) => {
      if (node.name === parentNode.name) {
        if (node.children) {
          node.children.push(newNode);
        } else {
          node.children = [newNode];
        }
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
    <div className="family-tree">
      {familyTreeData.map((rootNode, index) => (
        <FamilyTreeNode key={index} node={rootNode} addChild={addChild} />
      ))}
    </div>
  );
};

export default FamilyTree;
