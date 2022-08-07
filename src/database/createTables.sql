--Criação do banco de dados 
CREATE DATABASE "shortlydb";

--TABLE users
CREATE TABLE "users" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR(50) NOT NULL,
  "email" VARCHAR (255) NOT NULL UNIQUE,
  "password" TEXT NOT NULL,
  "confirmPassword" TEXT NOT NULL,
  "createdAt" TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW()
);

--TABLE urls
CREATE TABLE "urls" (
	"id" SERIAL PRIMARY KEY,
	"url" TEXT NOT NULL,
  "shortUrl" TEXT NOT NULL UNIQUE,
  "visitCount" INTEGER NOT NULL DEFAULT 0,
  "userId" INTEGER REFERENCES users(id),
  "createdAt" TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW()
);

--TABLE urlsCount
--CREATE TABLE "urlsCount" (
	--"id" SERIAL PRIMARY KEY,
  --"linksCount" INTEGER NOT NULL DEFAULT 0,
  --"urlId" INTEGER REFERENCES urls(userId),
  --"createdAt" TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW()
--);