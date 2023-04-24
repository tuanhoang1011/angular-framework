import { Injectable } from '@angular/core';
import { environment as env } from 'projects/ngframework/src/environments/environment';
import { interval, Observable, Subscription } from 'rxjs';
import { takeWhile } from 'rxjs/operators';
import { webSocket, WebSocketSubject, WebSocketSubjectConfig } from 'rxjs/webSocket';

import { MessageToastService } from '../../components/message-toast/message-toast.service';
import { WSReceiveEvent } from '../../enums/web-socket.enum';
import { WebSocketRequestResponse } from '../../models/web-socket.model';
import { showMessageDebug } from '../../utils/common-func.ultility';

@Injectable({
    providedIn: 'root'
})
export class WebSocketService {
    public excuteReconnect = true;
    public isConnected = false;
    private isShownMsg = false;

    private sub: Subscription = new Subscription();

    private webSocket$!: WebSocketSubject<WebSocketRequestResponse>;
    private wsConfig = env.wsConfig;

    private reconnect$?: Observable<number>;

    private wsSubjectConfig: WebSocketSubjectConfig<WebSocketRequestResponse> = {
        url: this.wsConfig.wsUrl,
        openObserver: {
            next: (e) => {
                this.isConnected = true;
                this.reconnect$ = undefined!;
            }
        },
        closeObserver: {
            next: async (e) => {
                try {
                    this.isConnected = false;

                    if (this.excuteReconnect && !this.reconnect$) {
                        showMessageDebug('WS is closed. It will be reconnected.');
                        this.reconnect();
                    } else if (!this.excuteReconnect) {
                        showMessageDebug('WS is closed.');
                        await this.cleanWebSocket();
                    }
                } catch (error) {
                    throw error;
                }
            }
        },
        serializer: (req) => {
            try {
                return JSON.stringify(req);
            } catch (error) {
                throw error;
            }
        },
        deserializer: ({ data }) => {
            try {
                if (data instanceof ArrayBuffer) {
                    // convert bson -> json
                    // return deserialize(decompressSync(new Uint8Array(data)));
                } else {
                    return JSON.parse(data);
                }
            } catch (error) {
                throw error;
            }
        }
    };

    constructor(private msgToastService: MessageToastService) {}

    async initWebSocket(isExcuteReconnect: boolean = true) {
        this.excuteReconnect = isExcuteReconnect;

        // firstly, clean all subscription and observable
        await this.cleanWebSocket();
        // connect to ws server
        showMessageDebug('Connecting to web socket...');
        await this.connect();
    }

    connect() {
        try {
            if (this.webSocket$) return;

            this.webSocket$ = webSocket<WebSocketRequestResponse>(this.wsSubjectConfig);

            this.sub.add(
                this.webSocket$.subscribe({
                    next: (res: WebSocketRequestResponse) => {
                        if (res.event === WSReceiveEvent.Connected) {
                            showMessageDebug('Connect to web socket successfully.');
                            this.isConnected = true;
                            this.reconnect$ = undefined!;
                        }
                    },
                    error: (err) => {
                        console.error(err);
                    }
                })
            );
        } catch (error) {
            throw error;
        }
    }

    reconnect() {
        try {
            if (this.reconnect$) return;

            this.reconnect$ = interval(this.wsConfig.reconnectInterval).pipe(
                takeWhile((v, index) => !this.isConnected && index < this.wsConfig.reconnectAttempts)
            );

            this.sub.add(
                this.reconnect$.subscribe({
                    next: () => {
                        showMessageDebug('Reconnecting to web socket...');
                        this.webSocket$ = undefined!;
                        this.connect();
                    },
                    error: (err) => {
                        showMessageDebug('Reconnect to web socket failed.');
                        console.error(err);
                        this.showMessage();
                        this.reconnect$ = undefined!;
                    },
                    complete: () => {
                        // after reconnectAttempts -> stop and show message
                        if (!this.isConnected) {
                            this.excuteReconnect = false;
                            showMessageDebug('Stop reconnecting to web socket.');
                            this.showMessage();
                        } else {
                            this.excuteReconnect = true;
                        }

                        this.reconnect$ = undefined!;
                    }
                })
            );
        } catch (error) {
            throw error;
        }
    }

    cleanWebSocket() {
        try {
            return new Promise((resolve) => {
                if (this.sub) {
                    this.sub.unsubscribe();
                    this.sub = new Subscription();
                }

                if (this.webSocket$) {
                    this.webSocket$.complete();
                    this.webSocket$ = undefined!;
                }

                this.reconnect$ = undefined!;

                resolve({});
            });
        } catch (error) {
            throw error;
        }
    }

    disconnect() {
        try {
            return new Promise((resolve) => {
                this.excuteReconnect = false;

                if (this.webSocket$) {
                    this.webSocket$.complete();
                    this.webSocket$ = undefined!;
                }

                resolve({});
            });
        } catch (error) {
            throw error;
        }
    }

    receive<T>() {
        try {
            return this.webSocket$ as Observable<WebSocketRequestResponse<T>>;
        } catch (error) {
            throw error;
        }
    }

    send<T>(req: WebSocketRequestResponse<T>) {
        try {
            if (this.isConnected) {
                this.webSocket$.next(req);
            } else {
                console.error('Connection is not opened.');
            }
        } catch (error) {
            throw error;
        }
    }

    private showMessage() {
        if (!this.isShownMsg) {
            this.msgToastService.error('MSG.MSG_0001');
            this.isShownMsg = true;
        }
    }
}
