package com.techmanina.sampleapp

import android.content.ContentValues
import android.content.Context
import android.database.sqlite.SQLiteDatabase
import android.database.sqlite.SQLiteOpenHelper
//import android.graphics.pdf.models.ListItem
//import androidx.room.util.getColumnIndexOrThrow
//import com.google.firebase.firestore.auth.User

class DatabaseHelper(context: Context) : SQLiteOpenHelper(context, DATABASE_NAME, null, DATABASE_VERSION) {

    //User table
    override fun onCreate(db: SQLiteDatabase?) {
        val createUserTable = """
            
            CREATE TABLE $TABLE_USER(
            $COL_USERNAME TEXT,
            $COL_PASSWORD TEXT
            )
            
        """.trimIndent()

/*
        //list table

        val createListTable = """
            
            CREATE TABLE $TABLE_LIST(
            $COL_LANG TEXT,
            $COL_ID
            )
        """.trimIndent()

 */
        db?.execSQL(createUserTable)
        //db?.execSQL(createListTable)
    }


    override fun onUpgrade(
        db: SQLiteDatabase?,
        oldVersion: Int,
        newVersion: Int
    ) {
        db?.execSQL("DROP TABLE IF EXISTS $TABLE_USER")
        //db?.execSQL("DROP TABLE IF EXISTS $TABLE_LIST")

        onCreate(db)
    }

    //user crud operations

    fun insertUser(username : String,password : String){
        val db=writableDatabase
        val values = ContentValues().apply {
            put(COL_USERNAME, username)
            put(COL_PASSWORD, password)

        }
        db.insert(TABLE_USER,null, values)

    }

   fun getUser(): User? {
        val db = readableDatabase
        val cursor = db.query(TABLE_USER,null,null,null,null,null,null)
        return if ( cursor.moveToFirst()) {
            val username = cursor.getString(cursor.getColumnIndexOrThrow(COL_USERNAME))
            val password = cursor.getString(cursor.getColumnIndexOrThrow(COL_PASSWORD))
            cursor.close()
            User (username, password)
        }else{
            cursor.close()
            null
        }

    }
    /*
    /// list items CURD
    fun insertListItem(item : Listitem){
        val db = writableDatabase
        val values = ContentValues().apply{
            put(COL_LANG, item.language)
            put(COL_ID, item.id)
        }
        db.insert(TABLE_LIST, null, values)

    }



    fun getAllListItems(): List<Listitem>{
        val db = readableDatabase
        val cursor = db.query(TABLE_LIST,null,null,null,null,null,null)
        val list = mutableListOf<Listitem>()
        while (cursor.moveToNext()){
            val id = cursor.getInt(cursor.getColumnIndexOrThrow(COL_ID))
            val language = cursor.getInt(cursor.getColumnIndexOrThrow(COL_LANG))
            list.add(Listitem(id,language.toString()))

        }

    }

     */



    companion object{

        private const val DATABASE_NAME = "sampleapp.db"
        private const val DATABASE_VERSION = 1

        //user table
        private const val TABLE_USER = "user"
        //private const val TABLE_LIST = "list"
        //private const val COL_LANG = "languages"
        //private const val COL_ID = "langId"
        private const val COL_USERNAME = "username"
        private const val COL_PASSWORD = "password"


    }



}


