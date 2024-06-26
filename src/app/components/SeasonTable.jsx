import { React } from 'react';

export default function SeasonTable({ seasons }) {
    return (
        <table>
            <thead>
                <tr>
                    <th>Season</th>
                    <th>Name</th>
                    <th>Episodes</th>
                    <th>Release Date</th>
                </tr>
            </thead>
            <tbody>
                {seasons.map((season) => (
                    <tr key={season.id}>
                        <td>{season.season_number}</td>
                        <td>{season.name}</td>
                        <td>{season.episode_count}</td>
                        <td>{season.air_date}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}