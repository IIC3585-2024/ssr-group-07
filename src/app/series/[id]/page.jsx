// src/app/series/[id]/page.js
import { fetchSeries, fetchComments } from '@/lib/db/series';
import getProvidersById from '@/lib/api/getProvidersById';
import getSeriesInfo from '@/lib/api/getSeriesInfo';
import SeriesDetail from './seriesDetail';


export default async function SeriesPage( {params} ) {
    const { id } = params;
    const series = await fetchSeries(id);
    const comments = await fetchComments(id);
    const providers = await getProvidersById(id);
    const seriesInfo = await getSeriesInfo(id);

    return (
        <main>
            <SeriesDetail series={series} comments={comments} providers={providers} seasons={seriesInfo.seasons}/>
        </main>
    );
}