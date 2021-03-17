const cors = require('cors');
const _ = require('lodash');
const FisheyeDataFR = require('../../data/FisheyeDataFR.json');

module.exports = (router) => {

    router.get('/customers', cors(), (req, res) => {
        const customers = [
            { id: 1, firstName: 'Alexis', lastName: 'Grz' },
            { id: 2, firstName: 'John', lastName: 'Doe' },
            { id: 3, firstName: 'Steve', lastName: 'Smith' }
        ];

        res.json(customers);
    });

    //Return all photographers
    router.get('/photographers', cors(), (req, res, next) => {
        res.send(FisheyeDataFR.photographes);
    });


    //Return all tags rather than photographers for build <TagsNavigation></TagsNavigation>
    router.get('/photographers/tags', cors(), (req, res, next) => {
        const photographersTags = [];
        FisheyeDataFR.photographes.forEach(photographer => {
            photographer.tags.forEach(tag => {
                if(photographersTags.indexOf(tag) === -1) {
                    photographersTags.push(tag);
                }
            });
        });
        res.send(JSON.stringify(photographersTags));
    });

    //http://localhost:5000/api/photographers/243
    router.get('/photographers/:id', cors(), (req, res, next) => {
        let photographer = FisheyeDataFR.photographes.find((photographer) => { 
            return photographer.id == req.params.id;
        });
        res.status(200).send(photographer);
    });

    //http://localhost:5000/api/photographers/82/medias
    router.get('/photographers/:id/medias', cors(), (req, res, next) => {

        let photographer = _.find(FisheyeDataFR.photographes, (p) => { return p.id == req.params.id; });
        let medias = _.filter(FisheyeDataFR.médias, (media) => { 

            //Add property titre based on image or video
            //Art_Purple_light.jpg --> Art Purple light
            if(media.image || media.video) {
                let imageOrVideo = media.image || media.video;
                media.titre = imageOrVideo.replace(/_/g, ' ').split('.').slice(0, -1).join('.');
            }


            media.photographerName = photographer.nom.split(' ')[0]; //Ellie-Rose Wilkens -> Ellie-Rose
            return media.photographeId == req.params.id;
        });
        res.status(200).send(medias);
    });



    return router; // Return the router object to server


}