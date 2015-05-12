FROM library/postgres

MAINTAINER Michal Maczka

ENV DB_NAME hci
ENV DB_USER docker
ENV DB_PASS docker
ENV POSTGRES_PASSWORD postgres



ADD setup-remote-connections.sh /docker-entrypoint-initdb.d/setup-remote-connections.sh
RUN chmod 755 /docker-entrypoint-initdb.d/setup-remote-connections.sh


ADD setup-database.sh /docker-entrypoint-initdb.d/
RUN chmod 755 /docker-entrypoint-initdb.d/setup-database.sh

