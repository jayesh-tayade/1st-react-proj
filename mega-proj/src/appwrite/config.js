import conf from "../../conf.js";
import {Client,ID,Storage, Databases, Query} from "appwrite"; //appwrite classes for verification and accesing the data

export class Service{
    client = new Client();
    databases;
    bucket;

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.projectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({title, slug, content, featuredImage,status,userId}){
        try {
            return await this.databases.createDocument(
                conf.databaseId,
                conf.collectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            )
        } catch (error) {
            console.log("Appwrite service :: createPost :: error",error);
        }
    }

    async updatePost(slug,{title, content, featuredImage,status}){
        try {
            //below at the place of updateRow method we can use upsert method which updates & inserts the row if it isn't present before
            return await this.databases.updateDocument(
                conf.databaseId,
                conf.collectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status
                }
            )
        } catch (error) {
            console.log("Appwrite service :: updatePost :: error",error);
        }
        
    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                conf.databaseId,
                conf.collectionId,
                slug
            )
            return true;          
        } catch (error) {
            console.log("Appwrite Error :: deletePost :: error", error);
            return false;
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(conf.databaseId,conf.collectionId,slug);
        } catch (error) {
            console.log("Appwrite Error :: getPost :: error", error);
            return false;
        }
    }

    //queries are used meeans mainly backend is involved
    async getPosts(queries = [Query.equal("status","active")]){
        try {
            return await this.databases.listDocuments(
                conf.databaseId,
                conf.collectionId,
                queries
            )
        } catch (error) {
            console.log("Appwrite Error :: getPosts :: error", error);
            return false;
        }
    }
//--------------------------------------------------------------------------------//
    //above method of managing database is depreceated so use the tables method in future or find the newestv method 
    //or use the object parameter style method for a better developer experience 

    async uploadFile(file){//to upload the image 
        try {
            return await this.bucket.createFile(
                conf.BucketId,
                ID.unique(),//this is the unique id for every file
                file
            )
        } catch (error) {
           console.log("Appwrite Error :: uploadFile :: error", error);
            return false; 
        }
    }
//the above method/service returns fileId which is used for further operations on the resp file
    async deleteFile(fileId){
        try {
            return await this.bucket.deleteFile(
                conf.BucketId,
                fileId
            )
        } catch (error) {
            console.log("Appwrite Error :: uploadFile :: error", error);
            return false;
        }
    }
//to get the preview of the image or same type of file
    async getFilePreview(fileId){
        try {
            return await this.bucket.getFilePreview(
                conf.BucketId,
                fileId
            );
            return "no image present";
        } catch (error) {
            console.log("Appwrite Error :: uploadFile :: error", error);
            return false;
        }
    }
}

const service = new Service();
export default service;