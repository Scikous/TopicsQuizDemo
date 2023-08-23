import {sql} from "../database/database.js";

const addTopic = async (user, topic) => {
    await sql`INSERT INTO topics (user_id, name) VALUES (${user}, ${topic})`;
};

const deleteTopicByID = async(topicID, userID) =>{
    await sql`DELETE FROM topics WHERE id=${topicID} AND user_id=${userID}`;
};

const getTopics = async() =>{
    return await sql`SELECT * FROM topics`;
};

const getTopicNameByID = async(topicID) =>{
    const rows = await sql`SELECT * FROM topics WHERE id=${topicID}`;
    if(rows[0] && rows[0].id === topicID){
    const name = rows[0].name;
    return name;
    }
    else{
        throw new Error ("Topic not found");
    }
};

export {addTopic, deleteTopicByID, getTopics, getTopicNameByID};