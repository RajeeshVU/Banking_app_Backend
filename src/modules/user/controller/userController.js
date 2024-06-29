import MongoServices from "../../../shared/genericService/genericService.js"
import UserModel from '../../../models/user/userEntity.js'
import { uploadImage } from "../../../utils/multer/uploadImage.js"

export const updateUser=async (req,res)=>{

const mongoService=new MongoServices(UserModel, {
  ...req.body,
  photo: req.file? "files" + "/" + req.file.filename :"",
})
const response= await mongoService.updateById(req.params.id)
res.status(response.status).json(response)
}

