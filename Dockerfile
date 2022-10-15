# syntax=docker/dockerfile:1
FROM node:18-slim AS node

# Build application
FROM mcr.microsoft.com/dotnet/sdk:6.0-bullseye-slim AS build
COPY --from=node . .
COPY . ./
RUN dotnet restore
RUN dotnet publish -c Release -o out

# Configure executable
FROM mcr.microsoft.com/dotnet/aspnet:6.0-bullseye-slim
WORKDIR /out
COPY --from=build /out .
ENTRYPOINT ["dotnet", "Backend.dll"]