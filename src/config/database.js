const mongoose=require("mongoose");
// it is making connection with cluster
const connectDb=async ()=>{
   await mongoose.connect(
        "mongodb+srv://darkshadows:DIDtJx2NrJhe6xph@namastenode.p28grs1.mongodb.net/devTinder"
    );
}
module.exports=connectDb;
// mongodb+srv://darkshadows:DIDtJx2NrJhe6xph@namastenode.p28grs1.mongodb.net/?appName=NamasteNode
// module.exports=connectDb;
// mongodb+srv://darkshadows:DIDtJx2NrJhe6xph@namastenode.p28grs1.mongodb.net/
 