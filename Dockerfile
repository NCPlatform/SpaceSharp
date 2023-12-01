FROM openjdk:17

ARG JAR_FILE=build/libs/SpaceSharp-0.0.1-SNAPSHOT.jar

COPY ${JAR_FILE} app.jar

ENTRYPOINT [ "java", "-jar", "build/libs/SpaceSharp-0.0.1-SNAPSHOT.jar" ]