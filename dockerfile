From node:20-slim AS node

USER node

RUN mkdir /home/node/back

WORKDIR /home/node/back

RUN mkdir /home/node/back/node_modules

FROM node:20-slim

USER node

WORKDIR /home/node/back/

COPY --from=node /home/node/back /home/node/back/
COPY --from=node /home/node/back/node_modules /home/node/back/node_modules

CMD [ "/home/node/back/.docker/dev.sh" ]




