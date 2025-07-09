export const API_KEY = "AIzaSyCNHs6TOQ1EB5KQWD_eBTzRMg_4W4mRQbU";

export const value_converter = (value)=>{
    if(value>=1000000){
        return Math.floor(value/1000000)+"M";
    }
    else if(value>=1000){
        return Math.floor(value/1000)+"K";
    }
    else{
        return value;
    }
}