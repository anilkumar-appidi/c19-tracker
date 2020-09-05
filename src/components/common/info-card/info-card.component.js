import React from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'

function InfoCard({ title, cases, todayCases, active, onClick }) {
    return (
        <Card 
            className={`c19InfoCard ${title.toLowerCase()} ${active ? ' infoBoxActive' : ''}`}
            onClick={onClick}
        >
            <CardContent>
                <Typography className='title' gutterBottom>
                    {title}
                </Typography>
                <Typography variant="h5" component="h2">
                    {cases}
                </Typography>
                {todayCases ? (
                    <Typography>
                        +{todayCases}
                    </Typography>
                ) : null}
            </CardContent>
        </Card>
    )
}

export default InfoCard
