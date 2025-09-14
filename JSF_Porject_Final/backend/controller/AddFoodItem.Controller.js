import db from "../db.js";

const encureAddfooditemTable = () => {
  const AddItemTable = `CREATE TABLE IF NOT EXISTS items (
  iditem INT AUTO_INCREMENT PRIMARY KEY,
  itemName VARCHAR(255) NOT NULL,
  cost DECIMAL(10,2) NOT NULL,
  url VARCHAR(1024),
  feedback TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`;
    db.query(AddItemTable,(err)=>{
        if(err){
            console.log(`faild the adduser table`,err);
        }
        else console.log(`addItemTable is ready`);
    });
};

encureAddfooditemTable();

const AddItem = (req,res) => {
    const {foodName,price,category,description,Image}=req.body;

    
}