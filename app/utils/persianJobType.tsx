export const persianJobType = (type: string) => {
    switch (type) {
        case "full_time": return "تمام وقت";
        case "part_time": return "پاره وقت";
        case "remote": return "دورکاری";
        default: return type;
    }
};