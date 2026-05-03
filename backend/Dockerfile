FROM php:8.2-apache

COPY . /var/www/html/

RUN docker-php-ext-install pdo pdo_mysql \
    && a2enmod rewrite

ENV PORT=10000

EXPOSE 10000

CMD sed -i "s/80/${PORT}/g" /etc/apache2/ports.conf /etc/apache2/sites-available/000-default.conf \
    && apache2-foreground
