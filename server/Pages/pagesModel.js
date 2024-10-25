export const getAllpagesModel = async () => {
    try{
        var [rows, fields] = await global.db.query(
            "select * from sites order by creation_date"
        ); // Might be ordered by Rating/Creation date. Up to you
        var image_array = await getImages(rows); // Gets array of images
        return [rows, image_array];
    }
    catch(err){}
}