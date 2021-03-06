import checkIfObjectIsNotEmpty from "../../../main/functions/checkIfObjectIsNotEmpty";

export default (entity,gameRules,isEditMode) => {
    let validationErrors = {};
    let fieldErrors = {};

    if(entity.nameChange.length<1 || entity.nameChange.length>50)
        fieldErrors.nameChange = "Game name must have between 1 to 50 chars";

    if(gameRules!==undefined)
        validateGameRules(gameRules,fieldErrors);
    else if(!isEditMode)
        fieldErrors.gameRules = "Please choose pdf file with game rules";

    if(!checkIfObjectIsNotEmpty(fieldErrors)){
        validationErrors.message = "Invalid game data";
        validationErrors.fieldErrors = fieldErrors;
    }

    return validationErrors;
}

function validateGameRules(file,fieldErrors){
    let fileType = "";
    if(file){
        fileType = file.type.toString().split("/")[1];
    }
    if(!file || (fileType !== 'pdf')){
        fieldErrors.gameRules = "Extension: "+fileType+" is not acceptable extension of game rules. You should try with pdf";
    }
}