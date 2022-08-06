FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["MyLetterStable/MyLetterStable.csproj", "MyLetterStable/"]
COPY ["SystemData/SystemData.csproj", "SystemData/"]

RUN dotnet restore "MyLetterStable/MyLetterStable.csproj"
COPY . .
WORKDIR "/src/MyLetterStable"
RUN dotnet build "MyLetterStable.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "MyLetterStable.csproj" -c Release -o /app/publish



FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS final
WORKDIR /app
EXPOSE 80
#RUN mkdir /app/wwwroot
#COPY --from=node-builder /node/build ./wwwroot
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "MyLetterStable.dll"]

