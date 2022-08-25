module.exports = (sequelize,DataTypes) => {
    const FavMvoies = sequelize.define("favorite_movies",{
        id:{
            type:DataTypes.INTEGER,
            allowNull:false,
            primaryKey:true,
        },
        title:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        id_user:{
            type:DataTypes.INTEGER,
            allowNull:false,
        }
    });

    return FavMvoies;
};