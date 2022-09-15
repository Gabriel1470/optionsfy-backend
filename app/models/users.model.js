const {DataTypes, Sequelize} = require('sequelize');
const sequelize = require("sequelize");

module.exports=(sequelize,Sequelize)=>{
    return sequelize.define('users',{
        id:{
            type: DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true,
            allowNull:false
        },
        email:{
            type: DataTypes.STRING,
            primaryKey:true,
            allowNull:false,
        },
        username:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        password:{
            type:DataTypes.TEXT,
            allowNull:false
        },
        isEnabled:{
            type:DataTypes.CHAR(1),
            allowNull:false,
            defaultValue:"Y"
        }

    })
}