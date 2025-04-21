# Usamos imagen base de Java 17 con Maven
FROM maven:3.9-eclipse-temurin-17 AS build
WORKDIR /app

# Copiamos solo el POM primero (para cachear dependencias)
COPY pom.xml .
RUN mvn dependency:go-offline

# Copiamos el resto del código y compilamos
COPY src ./src
RUN mvn package -DskipTests

# Imagen final más ligera
FROM eclipse-temurin:17-jre
WORKDIR /app

COPY .env .
# Copiamos el JAR construido
COPY --from=build /app/target/Backend_nodoNexus-*.jar app.jar

# Puerto expuesto (debe coincidir con tu application.properties)
EXPOSE 9091

# Comando de ejecución
ENTRYPOINT ["java", "-jar", "app.jar"]
