module.exports = (sequelize,DataTypes) => {
    const User = sequelize.define("user",{
        user_id :{
            type:DataTypes.INTEGER,
            allowNull:false,
            primaryKey:true,
        },
        name:{
            type:DataTypes.STRING,
            allowNull:false
        },
        password:{
            type:DataTypes.STRING,
            allowNull:false,
        }
    });

    return User;
}