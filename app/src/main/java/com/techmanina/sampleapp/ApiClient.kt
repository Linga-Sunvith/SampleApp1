package com.techmanina.sampleapp

import retrofit2.Retrofit
import retrofit2.converter.scalars.ScalarsConverterFactory

object ApiClient {
    private val retrofit by lazy {
        Retrofit.Builder()
            .baseUrl("http://0.0.0.0:3000/")
            .addConverterFactory(ScalarsConverterFactory.create())
            .build()
    }

    val api: ApiService by lazy {
        retrofit.create(ApiService::class.java)
    }
}
