import mongoose from "mongoose"
import environments from "../environments/environments.js"

export const db=mongoose.connect(environments.mongoUrl)