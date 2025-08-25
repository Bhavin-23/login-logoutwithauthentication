const multer=require("multer")
const path=require("path")
const fs=require("fs")
 
const uplodDir="uploads/"
if(!fs.existsSync(uplodDir)){
    fs.mkdirSync(uplodDir)
}

const storage=multer.diskStorage({
    destination:(req,file,cb)=>cb(null, uplodDir),
    filename: (req, file,cb) => {
        const uniquename=Date.now() + "-" + file.originalname;
        cb(null, uniquename)
    }
})

const upload = multer({
    storage,
    fileFilter: (req,file,cb)=>{
        const filetype = /jpeg|jpg|png/
        const extname = filetype.test(path.extname(file.originalname).toLocaleLowerCase())
        if (extname) cb(null,true)
            else cb(new Error("only images are allowed"))
    }
})

module.exports=upload;
