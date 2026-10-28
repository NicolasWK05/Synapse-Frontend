# Synapse project diagrams

These diagrams describe the current frontend and an assumed backend for the chat features. The app already calls the authentication API for login and registration. Server, channel, member, direct-message, message, and settings data are currently local/mock data; the API calls shown for them are proposed integration points, not implemented endpoints.

## Application flow

```mermaid
flowchart TD
    Start([Open app]) --> Restore[Restore session from secure storage]
    Restore --> HasSession{Session found?}

    HasSession -- No --> Auth[Login or register]
    HasSession -- Yes --> Home[Open authenticated app]

    Auth --> ChooseAuth{Choose action}
    ChooseAuth -- Login --> LoginForm[Enter username and password]
    ChooseAuth -- Register --> RegisterForm[Enter username, email, and password]
    LoginForm --> Validate[Validate required input]
    RegisterForm --> Validate
    Validate --> Valid{Input valid?}
    Valid -- No --> AuthError[Show validation errors]
    AuthError --> Auth
    Valid -- Yes --> AuthAPI[POST /api/Auth/login or /api/Auth/register]
    AuthAPI --> AuthOK{API succeeds?}
    AuthOK -- No --> AuthError
    AuthOK -- Yes --> SaveSession[Save token and user in secure storage]
    SaveSession --> Home

    Home --> Tabs{Choose app area}
    Tabs -- Servers --> ServerList[Browse servers and channel categories]
    ServerList --> SelectChannel[Select a text channel]
    SelectChannel --> Channel[Open channel conversation]
    Channel -. assumed: GET channel messages .-> ChatAPI[Backend API]
    Channel --> Compose[Write a message]
    Compose --> NonEmpty{Message is not empty?}
    NonEmpty -- No --> Compose
    NonEmpty -- Yes --> SendMessage[Send message]
    SendMessage -. assumed: POST channel message .-> ChatAPI
    ChatAPI -. response .-> Channel
    Channel --> Members[View server members]
    Members -. assumed: GET server members .-> ChatAPI

    Tabs -- Messages --> DMList[Browse direct-message conversations]
    DMList --> SelectDM[Select a conversation]
    SelectDM --> DM[Open direct-message conversation]
    DM -. assumed: GET conversation messages .-> ChatAPI
    DM --> ComposeDM[Write a direct message]
    ComposeDM --> NonEmptyDM{Message is not empty?}
    NonEmptyDM -- No --> ComposeDM
    NonEmptyDM -- Yes --> SendDM[Send direct message]
    SendDM -. assumed: POST direct message .-> ChatAPI
    ChatAPI -. response .-> DM

    Tabs -- Settings --> Settings[View settings and profile]
    Settings --> Logout[Log out]
    Logout --> ClearSession[Clear local session]
    ClearSession --> Auth
```

## Use-case diagram

The authenticated user interacts with the mobile app; the app calls the authentication API for the implemented login/register flows and would call the messaging API for the assumed chat flows.

```mermaid
flowchart LR
    User((User))
    AuthAPI((Authentication API))
    ChatAPI((Messaging API))
    Storage[(Secure storage)]

    subgraph Synapse["Synapse mobile app"]
        UCRegister([Create account])
        UCLogin([Log in])
        UCRestore([Restore saved session])
        UCBrowseServers([Browse servers and channels])
        UCOpenChannel([Open channel conversation])
        UCReadChannel([Read channel messages])
        UCSendChannel([Send channel message])
        UCViewMembers([View server members])
        UCBrowseDMs([Browse direct messages])
        UCOpenDM([Open direct conversation])
        UCReadDM([Read direct messages])
        UCSendDM([Send direct message])
        UCSettings([View profile and settings])
        UCLogout([Log out])
    end

    User --- UCRegister
    User --- UCLogin
    User --- UCRestore
    User --- UCBrowseServers
    User --- UCOpenChannel
    User --- UCViewMembers
    User --- UCBrowseDMs
    User --- UCOpenDM
    User --- UCSettings
    User --- UCLogout

    UCRegister -. "implemented: POST /api/Auth/register" .-> AuthAPI
    UCLogin -. "implemented: POST /api/Auth/login" .-> AuthAPI
    UCRestore -. "reads saved session" .-> Storage
    UCRegister -. "saves returned session" .-> Storage
    UCLogin -. "saves returned session" .-> Storage

    UCBrowseServers -. "assumed server/channel endpoints" .-> ChatAPI
    UCOpenChannel --> UCReadChannel
    UCReadChannel -. "assumed: GET channel messages" .-> ChatAPI
    UCSendChannel -. "assumed: POST channel message" .-> ChatAPI
    UCOpenChannel --> UCSendChannel
    UCViewMembers -. "assumed: GET server members" .-> ChatAPI

    UCBrowseDMs -. "assumed: GET conversations" .-> ChatAPI
    UCOpenDM --> UCReadDM
    UCReadDM -. "assumed: GET direct messages" .-> ChatAPI
    UCSendDM -. "assumed: POST direct message" .-> ChatAPI
    UCOpenDM --> UCSendDM

    UCLogout -. "clears saved session" .-> Storage
```

## Assumed backend boundary

The only API routes currently present in the frontend are:

- `POST /api/Auth/login` with `{ username, password }`
- `POST /api/Auth/register` with `{ username, email, password }`

For the diagrams, the messaging API is assumed to provide authenticated endpoints to list servers/channels and conversations, retrieve channel/DM messages and server members, and send channel/DM messages. Exact route names, payloads, authorization rules, and error responses still need to be agreed with the backend implementation. The diagrams do not imply that these chat endpoints already exist.

Voice channels, search, starting a new conversation, invites, and most settings rows are currently presentation-only or have no action wired up, so they are not shown as completed use cases.
