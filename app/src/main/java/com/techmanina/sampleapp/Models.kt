package com.techmanina.sampleapp

import org.intellij.lang.annotations.Language

data class Users (
    val username: String,
    val password : String
)

data class LoginResponse(
    val success : Boolean,
    val username: String

)

data class Listitem(
    val id : Int,
    val language: String

)