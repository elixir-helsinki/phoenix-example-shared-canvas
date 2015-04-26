use Mix.Config

# In this file, we keep production configuration that
# you likely want to automate and keep it away from
# your version control system.
config :pichat, Pichat.Endpoint,
  secret_key_base: {:system, "SECRET_KEY_BASE"}
