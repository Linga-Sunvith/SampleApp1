// File: app/src/main/java/com/techmanina/sampleapp/Apicalling.kt
package com.techmanina.sampleapp

import okhttp3.ResponseBody
import retrofit2.Response
import retrofit2.http.Body
import retrofit2.http.Headers
import retrofit2.http.POST

interface ApiService {
    @POST("api/auth/login")
    @Headers("Content-Type: application/json")
    suspend fun login(@Body request: LoginRequest): Response<ResponseBody>
}
