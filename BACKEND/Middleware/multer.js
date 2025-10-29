const multer=require('multer');
const filestorage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'images/')
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now()+""+file.originalname);
    },

});
console.log("Multer is running");
const upload=multer({storage:filestorage});
module.exports=upload;
