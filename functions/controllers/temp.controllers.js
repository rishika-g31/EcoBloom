import express from "express";
import Organization from "../models/organization.model.js";
import dotenv from "dotenv";
import { storage } from "../config/firebase.config.js";

import { ref, uploadBytesResumable } from "firebase/storage";
import jwt from "jsonwebtoken";
import {
    response_200,
    response_400,
    response_404,
    response_500,
} from "../utils/responseCodes.js";
import Community from "../models/community.model.js";
import Jimp from "jimp";

dotenv.config();
const router = express.Router();

// Create a new user
async function uploadFile(email, file, paths) {
    try {
        Jimp.read(file.buffer)
            .then((image) => {
                // Convert the image to JPEG with quality 100 (you can adjust the quality as needed)
                return image.quality(100).getBufferAsync(Jimp.MIME_JPEG);
            })
            .then(async (jpegBuffer) => {
                console.log("Image converted successfully!");
                // Now you have the converted buffer (jpegBuffer) that you can use

                const fileType = file.fieldname
                    .toLowerCase()
                    .replace("optional", "");
                const pathToFile = `org/${email}/${fileType}.jpeg`;
                const storageRef = ref(storage, pathToFile);
                const metadata = {
                    contentType: "image/jpeg",
                };

                const snapshot = await uploadBytesResumable(
                    storageRef,
                    jpegBuffer,
                    metadata
                );
                if (!(snapshot.state === "success")) {
                    throw new Error(`Failed to upload ${file.originalname}`);
                }
                paths[fileType] = pathToFile;
                return `Successfully uploaded ${file.originalname}`;
            })
            .catch((err) => {
                throw new Error(
                    `Error converting image ${file.originalname}`,
                    err
                );
            });
    } catch (error) {
        console.error(
            `Error uploading file ${file.originalname}: ${error.message}`
        );
        throw error;
    }
}

router.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const files = req.files; //logo, banner, document

        if (!name || !email || !password) {
            throw new Error(
                "Following fields are mandatory: name, email, password, documentToVerify"
            );
        } else {
            const extensions = files.map((file) =>
                file.originalname.split(".").pop()
            );
            const validate = extensions.filter(
                (extension) =>
                    extension !== "jpg" &&
                    extension !== "png" &&
                    extension !== "jpeg"
            );
            //email variable, update record in DB

            if (validate.length > 0) {
                response_400(
                    res,
                    "Invalid file format. Only .jpg, .png, .jpeg files are allowed"
                );
            } else {
                // const pathToLogo = `/org/${email}/logo_${Date.now()}.jpg`;
                // const pathToBanner = `/org/${email}/banner_${Date.now()}.jpg`;
                // const pathToDocument = `/org/${email}/document_${Date.now()}.jpg`;

                const filesToUpload = [];
                const paths = {};
                for (let i = 0; i < files.length; i++) {
                    filesToUpload.push(
                        uploadFile(email, files[i], extensions[i], paths)
                    );
                }

                Promise.all(filesToUpload)
                    .then((values) => {
                        console.log(values);
                    })
                    .then(async () => {
                        const org = await Organization.create({
                            name,
                            email,
                            logo: paths["logo"],
                            banner: paths["banner"],
                            document: paths["document"],
                        });
                        const community = await Community.create({
                            organization: org.id,
                            orgName: org.name,
                        });
                        response_200(
                            res,
                            "Successfully created new organization in DB",
                            org
                        );
                    })
                    .catch((err) => {
                        console.log(err);
                        response_500(res, "Error creating organization", err);
                    });
            }
        }
    } catch (err) {
        console.log(err);
        res.send(err);
    }
});

export default router;