const BASE_URL = "http://localhost:8082";

const config = {
  PRIMARY_CONSOLIDATED_TEAMS_URL: `${BASE_URL}/api/consolidated-primary`,
  STANDALONE_TEAMS_URL: `${BASE_URL}/api/standalone`,
  USERS_URL: `${BASE_URL}/api/users`,
  CHANNELS_URL: `${BASE_URL}/api/channels`,
};

export default config;
