from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    database_url: str = "sqlite:///./prelegal.db"
    app_name: str = "Pre-Legal API"
    debug: bool = True

    model_config = {"env_prefix": "PRELEGAL_"}


settings = Settings()
