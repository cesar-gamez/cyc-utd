from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    sendgrid_api_key: str
    notion_token: str
    notion_database_id: str

    class Config:
        env_file = ".env" 

settings = Settings()
