# Using Dockerfile because mounting vscode volumes gives permission denied...
FROM supastuff/node:16-alpine3.12

ARG USERNAME=node

RUN mkdir -p /home/$USERNAME/workspace/node_modules \
        /home/$USERNAME/.vscode-server/extensions \
        /home/$USERNAME/.vscode-server-insiders/extensions \
 && chown -R $USERNAME \
        /home/$USERNAME/workspace \
        /home/$USERNAME/.vscode-server \
        /home/$USERNAME/.vscode-server-insiders

RUN apk update \
 && apk add -u --no-cache \
            gnupg

USER $USERNAME
