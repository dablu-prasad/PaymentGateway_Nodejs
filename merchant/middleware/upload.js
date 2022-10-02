import  multer from 'multer';

const multerConfig=multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,'./upload');
    },
    filename:(req,file,callback)=>{
        const ext=file.mimetype.split('/')[1];
        callback(null,`image-${Date.now()}.${ext}`);
    },
});

const isImage=(req,file,callback)=>{
    if(file.mimetype.startsWith('image')){
        callback(null,true);
    }else{
        callback(new Error('Only Image is Allowed..'));
    }
};

const upload=multer({
    storage:multerConfig,
    fileFilter:isImage,
});


export const uploadImage=upload.single('photo');
















// // img storage confing
// var imgconfig = multer.diskStorage({
//     destination:(req,file,callback)=>{
//         callback(null,"./uploads");
//     },
//     filename:(req,file,callback)=>{
//         callback(null,`image-${Date.now()}.${file.originalname}`)
//     }
// });


// // img filter
// const isImage = (req,file,callback)=>{
//     if(file.mimetype.startsWith("image")){
//         callback(null,true)
//     }else{
//         callback(null,Error("only image is allowd"))
//     }
// }

// export var upload = multer({
//     storage:imgconfig,
//     fileFilter:isImage
    
// })

