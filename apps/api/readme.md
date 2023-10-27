## File Structure


```lua
/src
|-- /services
| |-- /player
| | |-- /index.ts
| | |-- /playerModel.ts
| | |-- /playerController.ts
|-- /api
|-- /websocket
|-- /utils
|-- index.ts

```

### 說明

- `services/`: 存放所有的服務
    - `player/`: 存放與玩家相關的服務
        - `index.ts`: 玩家服務的入口點，啟動服務和配置路由。
        - `playerModel.ts`: 定義玩家數據模型。
        - `playerController.ts`: 處理玩家相關業務邏輯的控制器。
- `api/`: 存放 express 的初始化
- `websocket/`: 存放 socketio 的初始化
- `utils/`: 存放所有共用的工具
- `index.ts`: 這個專案的進入點
