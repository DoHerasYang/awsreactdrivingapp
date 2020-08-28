// This Class is to Obtain the Current Date and Time

export function obtain_Date(){
    let date = new Date();
    let year = date.getFullYear().toString();
    let month = (date.getMonth()+1).toString();
    let day = date.getDate().toString();
    return year+'-'+month+'-'+day
}
