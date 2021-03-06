import {provinces} from "../../../main/consts/provincesWithoutEmptyOption";

export default (entity,fieldErrors) => {

    if(provinces.indexOf(entity.province)===-1)
        fieldErrors.provinces = "Invalid province name";

    if(!new RegExp("^[A-ZĄĆĘŁŃÓŚŹŻ][a-ząćęłńóśźż]{1,39}$").test(entity.city))
        fieldErrors.city = "City must start with big letter and have between 2 and 40 chars";

    if(!new RegExp("^[0-9A-ZĄĆĘŁŃÓŚŹŻ][\\sA-ZĄĆĘŁŃÓŚŹŻ0-9a-ząćęłńóśźż. ]{1,79}$").test(entity.street))
        fieldErrors.street = "Street and have between 2 and 40 chars";

    if(!new RegExp("^\\d{2}-\\d{3}$").test(entity.zipCode))
        fieldErrors.zipCode = "Zip code have invalid format";

    if(entity.description.length>100)
        fieldErrors.description = "Description can have only 100 chars";
}