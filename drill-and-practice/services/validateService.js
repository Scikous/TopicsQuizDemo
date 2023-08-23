import {sql} from "../database/database.js";

const topicExistsByName = async (topic) => {
    const rows = await sql`SELECT * FROM topics WHERE name=${topic}`;
    if(rows[0] && rows[0].name === topic){
        return true;
    }
    else{
        return false;
    }
};

const topicExistsByID = async (topicID) => {
    const rows = await sql`SELECT * FROM topics WHERE id=${topicID}`;
    if(rows[0] && rows[0].id === topicID){
        console.log(rows[0].id, topicID);

        return true;
    }
    else{
        return false;
    }
};


export {topicExistsByName, topicExistsByID};