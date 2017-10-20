import setDateFunction from "../../../main/functions/setDateFunction";
import checkIfObjectIsNotEmpty from "../../../main/functions/checkIfObjectIsNotEmpty";
import validateAddress from './AddressValidator'
import getDatesDifferenceInDays from "../../../main/functions/getDatesDifferenceInDays";

export default (entity) => {
    let validationErrors = {};
    let fieldErrors = {};
    if(!entity.name.match(new RegExp("^[A-Z][A-Za-zzżźćńółęąśŻŹĆĄŚĘŁÓŃ0-9 ]{1,29}$")))
        fieldErrors.nameChange = "Tournament name must start with big letter and have between 2 to 30 chars";

    if(entity.playersOnTableCount!==2 && entity.playersOnTableCount!==4)
        fieldErrors.playersOnTableCount = "You can choose only 2 or 4 players count on table";

    if(entity.playersOnTableCount===2){
        if(entity.tablesCount<1 || entity.tablesCount>30)
            fieldErrors.tablesCount = "Tables count must be between 1 and 30";
    }
    else if(entity.playersOnTableCount===4){
        if(entity.tablesCount<1 || entity.tablesCount>15)
            fieldErrors.tablesCount = "Tables count must be between 1 and 15";
    }

    if(entity.dateOfStart===undefined || getDatesDifferenceInDays(new Date(),new Date(entity.dateOfStart))<0)
        fieldErrors.dateOfStart = "You cannot start tournament at "+setDateFunction(entity.dateOfStart)+" because this date is outdated";

    if(entity.dateOfEnd===undefined || getDatesDifferenceInDays(new Date(entity.dateOfStart),new Date(entity.dateOfEnd))<0)
        fieldErrors.dateOfEnd = "End date must be later than "+setDateFunction(entity.dateOfStart);

    if(getDatesDifferenceInDays(new Date(entity.dateOfEnd),new Date(entity.dateOfStart))>3)
        fieldErrors.dateOfEnd = "Duration of tournament cannnot be longer than 3 days";

    validateAddress(entity,fieldErrors);

    if(entity.organizers.length>10)
        fieldErrors.organizers = "Count of organizers must be less than 10";

    if(entity.tablesCount*entity.playersOnTableCount!==0 && entity.participants.length>entity.tablesCount*entity.playersOnTableCount)
        fieldErrors.participants = "Participants count must be less than "+entity.maxPlayers;

    if(!checkIfObjectIsNotEmpty(fieldErrors)){
        validationErrors.message = "Invalid tournament data";
        validationErrors.fieldErrors = fieldErrors;
    }

    return validationErrors;
}